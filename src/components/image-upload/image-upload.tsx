"use client";

import { useState } from "react";
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
}

export function ImageUpload({ onUploadComplete, tenantId }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    if (!tenantId) return;

    async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {

        const files = event.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const newUrls: string[] = [];

        try {

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
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

                newUrls.push(data.publicUrl);
            }

            const updatedUrls = [...previewUrls, ...newUrls];
            setPreviewUrls(updatedUrls);
            onUploadComplete(updatedUrls);
            toast.success("Fotos enviadas com sucesso!");

        } catch (error) {
            console.error(error);
            toast.error("Erro ao fazer upload das imagens.");

        } finally {
            setUploading(false);
        }
    }

    function removeImage(urlToRemove: string) {

        const filtered = previewUrls.filter(url => url !== urlToRemove);
        setPreviewUrls(filtered);
        onUploadComplete(filtered);
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {uploading ? (
                            <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                        ) : (
                            <ImagePlus className="w-8 h-8 text-muted-foreground" />
                        )}
                        <p className="pt-1 text-sm text-muted-foreground">Adicionar Fotos</p>
                    </div>
                    <input 
                        type="file" 
                        className="hidden" 
                        multiple 
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                </label>

                {previewUrls.map((url, index) => (
                    <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border">
                        <Image 
                            src={url} 
                            alt={`foto ${index}`} 
                            fill 
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => removeImage(url)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
            <p className="text-xs text-muted-foreground">
                Formatos suportados: JPG, PNG. Máximo 5MB por foto.
            </p>
        </div>
    );
}