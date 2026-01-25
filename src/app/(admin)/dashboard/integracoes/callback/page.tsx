"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Plataforma } from "@/types/integracao/plataforma";
import { api } from "@/service/api";

export default function IntegracaoCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const processado = useRef(false);

    async function finalizarIntegracao(code: string, plataforma: Plataforma) {
        try {
            const redirectUri = `${window.location.origin}/dashboard/integracoes/callback`;

            await api.post("/integracoes/callback", {
                code,
                plataforma,
                redirectUri
            });

            toast.success(`Integração com ${plataforma} concluída com sucesso!`);
            router.push("/dashboard/integracoes");

        } catch (error) {
            console.error(error)
            toast.error(`Falha ao autenticar com ${plataforma}.`);
            router.push("/dashboard/integracoes");
        }
    }

    useEffect(() => {
        const code = searchParams.get("code");
        const plataformaSalva = localStorage.getItem("plataforma_pendente") as Plataforma;
        const plataformaAlvo = plataformaSalva || Plataforma.MERCADO_LIVRE;

        if (code && !processado.current) {
            processado.current = true;
            localStorage.removeItem("plataforma_pendente");
            finalizarIntegracao(code, plataformaAlvo)
            
        }
    }, [searchParams])

    return (
        <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
            <div className="bg-green-100 p-4 rounded-full animate-pulse">
                <Loader2 className="h-8 w-8 text-green-700 animate-spin" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Conectando Integração...</h2>
            <p className="text-gray-500">Estamos validando suas credenciais.</p>
        </div>
    )
}