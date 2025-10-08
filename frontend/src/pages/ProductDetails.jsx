import Container from "@/components/Container/Container";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductDetails() {
  const items = Array.from({ length: 9 });

  const visibleItems = items.slice(0, 5);
  const remainingCount = items.length - visibleItems.length;

  return (
    <section>
      <Container>
        <div className="bg-green-500 grid gap-6 grid-cols-1 md:grid-cols-2">
          <div className="flex gap-4">
            <div className="">
              {visibleItems.map((_, index) => (
                <Card
                  key={index}
                  className="relative w-14 h-14 sm:w-16 sm:h-16 overflow-hidden mb-2"
                >
                  <CardContent className="p-0">
                    <img
                      src="https://placehold.co/600x600/gray/FFFFFF/png"
                      alt={`Card ${index}`}
                      className="w-full h-full"
                    />

                    {/* If this is the last visible card and there are remaining items */}
                    {index === visibleItems.length - 1 &&
                      remainingCount > 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xl font-semibold">
                          +{remainingCount}
                        </div>
                      )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div>
              <Card className="py-0 max-w-100 overflow-hidden">
                <CardContent className="px-0">
                  <img
                    src="https://placehold.co/600x600/gray/FFFFFF/png"
                    alt=""
                    className="w-full h-full"
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
