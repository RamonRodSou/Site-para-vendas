"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import Image from "next/image";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface ImageUploadProps {
    onUploadComplete: (urls: string[]) => void;
    tenantId?: string;
    initialUrls?: string[]; 
}

export function ImageUpload({ onUploadComplete, tenantId, initialUrls }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (initialUrls && initialUrls.length > 0) {
            setPreviewUrls(initialUrls[0]);
        }
    }, [initialUrls]);

    const setPreviewUrls = (url: string | null) => {
        setPreviewUrl(url);
        if (url) {
            onUploadComplete([url]);
        } else {
            onUploadComplete([]);
        }
    };

    if (!tenantId) return null;

    async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        setUploading(true);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${tenantId}/${uuidv4()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('produtos_loja')
                .upload(fileName, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from('produtos_loja')
                .getPublicUrl(fileName);

            setPreviewUrls(data.publicUrl);
            toast.success("Foto enviada com sucesso!");

        } catch (error) {
            console.error(error);
            toast.error("Erro ao fazer upload da imagem.");
        } finally {
            setUploading(false);
            event.target.value = ""; 
        }
    }

    function removeImage() {
        setPreviewUrls(null);
    }

    return (
        <div className="w-full">
            
            {!previewUrl ? (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors bg-slate-50 border-slate-300">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {uploading ? (
                            <Loader2 className="w-10 h-10 text-muted-foreground animate-spin mb-2" />
                        ) : (
                            <ImagePlus className="w-10 h-10 text-muted-foreground mb-2" />
                        )}
                        <p className="text-sm font-medium text-muted-foreground">
                            {uploading ? "Enviando..." : "Clique para selecionar a foto"}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                            JPG, PNG ou WEBP (Max 5MB)
                        </p>
                    </div>
                    <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                </label>
            ) : (
                <div className="relative w-full h-64 rounded-lg overflow-hidden border border-slate-200 bg-white group">
                    <Image 
                        src={previewUrl} 
                        alt="Foto do produto" 
                        fill 
                        className="object-contain p-2"
                    />
                    
                    <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-lg transition-transform hover:scale-105"
                        title="Remover foto"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors pointer-events-none" />
                </div>
            )}
        </div>
    );
}