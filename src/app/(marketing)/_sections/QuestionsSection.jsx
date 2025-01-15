import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const questions = [
  {
    header: "¿Qué edad es apropiada para alquilar un coche para niños?",
    content:
      "La edad apropiada para alquilar un coche para niños depende en gran medida del tipo de coche. Algunos coches son adecuados para niños pequeños, mientras que otros están diseñados para niños mayores. Siempre verifica la recomendación de edad para cada coche.",
  },
  {
    header: "¿Qué medidas de seguridad están establecidas?",
    content:
      "Como compañía de alquiler de confianza, garantizamos que todos nuestros coches para niños cumplen con los estándares de seguridad. Esto puede incluir cinturones de seguridad, control remoto parental y límites de velocidad adecuados.",
  },
  {
    header: "¿Qué sucede si el coche se daña?",
    content:
      "Nuestro seguro cubre fallos eléctricos y daños en las piezas durante el uso habitual. Sin embargo, es importante señalar que nuestra cobertura no se extiende a robos o daños relacionados con el agua. Por favor, tómese un momento para familiarizarse con estos términos para que pueda tener una experiencia de alquiler sin inconvenientes. Si tiene alguna pregunta, no dude en preguntar, ¡estamos aquí para ayudarle!",
  },
  {
    header: "¿Puedo reservar un coche con antelación?",
    content:
      "Los clientes pueden reservar con antelación en la compañía de alquiler, lo cual es especialmente útil durante períodos de alta demanda como vacaciones o fines de semana.",
  },
  {
    header: "¿Qué tipos de coches para niños están disponibles para alquilar?",
    content:
      "La gama puede variar, pero a menudo incluye coches eléctricos, coches a pedales e incluso coches temáticos como todoterrenos y marcas de lujo.",
  },
];

export default function QuestionsSection() {
  return (
    <section
      id="questions"
      className="container pt-14 md:pt-20 bg-acccent/5 pb-16"
    >
      <Accordion type="single" collapsible defaultValue="item-0">
        {questions.map(({ header, content }, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-base lg:text-xl font-semibold">
              {header}
            </AccordionTrigger>
            <AccordionContent className="text-base lg:text-lg">
              {content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
