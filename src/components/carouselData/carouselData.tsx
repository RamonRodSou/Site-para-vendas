"use client";

import React from "react";
import Link from "next/link";

import { Produto } from "@/types/produto/produto";
import Item from "../item/item";

import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

interface Props {
    data: Produto[];
}

export default function CarouselData({ data }: Props) {
    if (!data || data.length === 0) return null;

    const plugin = React.useRef(
        Autoplay({ 
            delay: 3000,
            stopOnInteraction: true, 
        })
    );

  return (
    <div className="max-w-6xl mx-auto py-10 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
            
            <h2 className="text-1xl font-bold tracking-tighter md:text-2xl mb-8 text-slate-900">
                Você também vai gostar!
            </h2>

            <Carousel
            plugins={[plugin.current]}
            
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full"
            
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            >
            <CarouselContent className="-ml-4">
                {data.map((item) => (
                <CarouselItem 
                    key={item.id} 
                    className="pl-4 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                    <div className="p-1 h-full">
                    <Link href={`/produto/${item.id}`} className="block h-full">
                        <Item data={item}/>
                    </Link>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            
            <CarouselPrevious className="hidden md:flex -left-4 bg-white border-slate-300 hover:bg-slate-100 text-slate-700" />
            <CarouselNext className="hidden md:flex -right-4 bg-white border-slate-300 hover:bg-slate-100 text-slate-700" />
            </Carousel>
        </div>
    </div>
  );
}