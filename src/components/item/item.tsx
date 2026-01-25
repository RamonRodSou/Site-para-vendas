import Image from "next/image"
import { ExternalLink, Store, Clock } from "lucide-react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import { DateUtils } from "@/lib/dataUtils"
import { MoneyUtils } from "@/lib/moneyUtils"
import { Produto } from "@/types/produto/produto"
import Link from "next/link"

export default function Item({ data }: { data: Produto }) {

    return (
        <Card className="group w-full max-w-[280px] h-[330px] flex flex-col overflow-hidden bg-white hover:shadow-lg hover:border-orange-500 transition-all duration-300 cursor-pointer border-slate-200">
            
            <div className="relative h-[70%] w-full bg-white p-1 flex items-center justify-center border-b border-slate-100">
                
                {data.discount > 0 && (
                    <Badge className="absolute top-2 right-2 bg-green-600/90 hover:bg-green-700 font-bold z-10 text-[10px] px-2 h-7">
                        -{data.discount}%
                    </Badge>
                )}

                <div className="relative w-full h-full">
                    <Image 
                        src={data.image_url} 
                        alt={data.title}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-105 p-1"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                <div className="absolute bottom-2 right-2 shadow-sm rounded-full bg-white p-0.5 z-10 border border-slate-100">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={data.store_logo} alt={data.store_name} className="object-contain" />
                        <AvatarFallback><Store size={12} /></AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <CardContent className="h-[30%] p-3 flex flex-col justify-between bg-slate-50/30">
                
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1 text-[0.65rem] text-slate-400">
                            <Clock size={10} />
                            <span>{DateUtils.dateFormated(data.created_at)}</span>
                        </div>
                            <div className="flex items-center gap-1 text-[0.6rem] text-slate-500 uppercase font-bold tracking-wide">
                                <Store size={10} />
                                {data.store_name}
                        </div>
                    </div>

                    <h3 className="text-[0.75rem] font-medium text-slate-700 leading-tight line-clamp-2" title={data.title}>
                        {data.title}
                    </h3>
                </div>

                <div className="flex items-end justify-between mt-1">
                    <div className="flex flex-col">
                        {data.original_price > data.current_price && (
                            <span className="text-[0.65rem] text-slate-400 line-through h-3">
                                {MoneyUtils.formatToReal(data.original_price)}
                            </span>
                        )}
                        <span className="text-sm font-black text-slate-900 leading-tight">
                            {MoneyUtils.formatToReal(data.current_price)}
                        </span>
                    </div>
                    
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-md"
                        asChild
                    >
                        <Link href={data.affiliate_link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={14} />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}