import Container from "@/components/Container/Container";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductDetails() {
  return (
    <section>
      <Container>
        <div className="bg-green-500 grid gap-6 grid-cols-1 sm:grid-cols-2">
          <div className="">
            <Card className="py-0 overflow-hidden">
              <CardContent className="px-0">
                <img
                  src="https://placehold.co/600x600/gray/FFFFFF/png"
                  alt=""
                  className="w-full h-full"
                />
              </CardContent>
            </Card>
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
