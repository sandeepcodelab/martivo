import Container from "@/components/Container/Container";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ProductDetails() {
  return (
    <section className="mt-4">
      <Container>
        <div className="bg-green-500 grid gap-6 grid-cols-1 md:grid-cols-2">
          <div className="flex gap-4">
            <div className="bg-amber-600">
              <Carousel
                opts={{
                  align: "start",
                }}
                orientation="vertical"
                className="relative w-full max-w-20"
              >
                <CarouselContent className="-mt-1 h-80 sm:h-100">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <CarouselItem key={index} className="pt-1 basis-1/5">
                      <Card className="py-0 w-15 h-18 md:w-20 md:h-22 overflow-hidden">
                        <CardContent className="px-0">
                          <img
                            src="https://placehold.co/600x600/gray/FFFFFF/png"
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute top-0" />
                <CarouselNext className="absolute bottom-0" />
              </Carousel>
            </div>
            <div>
              <Card className="py-0 min-w-58 w-full h-80 sm:h-100 overflow-hidden">
                <CardContent className="px-0">
                  <img
                    src="https://placehold.co/600x600/gray/FFFFFF/png"
                    alt=""
                    className="object-contain md:object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="w-full px-5">
            <h1 className="text-2xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              commodi perferendis expedita, sapiente aspernatur ratione
              reiciendis quia non cupiditate eligendi nulla. Illum beatae totam
              iusto sapiente in fugiat autem facilis?
            </h1>
          </div>
        </div>
      </Container>
    </section>
  );
}
