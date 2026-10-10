import { Plus } from "lucide-react";
import { business, formatPrice } from "@/data/constants";

const questions = [
  {
    title: "¿Qué vehículo es adecuado para su edad?",
    answer:
      "Cada modelo tiene su propia edad recomendada y capacidad de carga. Revisa su ficha y consúltanos si necesitas ayuda para elegir.",
  },
  {
    title: "¿Cómo se confirma el alquiler?",
    answer:
      "Escríbenos por WhatsApp o llámanos con el modelo y la fecha que te interesan. Confirmaremos contigo la disponibilidad y las condiciones antes de la recogida.",
  },
  {
    title: "¿Qué necesito para recoger el vehículo?",
    answer: `La persona titular del alquiler debe ser mayor de 18 años, presentar su DNI y dejar una fianza de ${formatPrice(business.deposit)} por vehículo.`,
  },
  {
    title: "¿Se puede entregar el vehículo a domicilio?",
    answer:
      "Puedes consultar nuestro servicio de entrega con cargo adicional. Acordaremos contigo la zona, el horario y el importe antes de confirmar el alquiler.",
  },
  {
    title: "¿Qué hago si hay algún problema con el vehículo?",
    answer:
      "Contacta con Antelu para que podamos ayudarte. Consulta las condiciones de uso, devolución y posibles daños antes de confirmar tu alquiler.",
  },
];

export default function QuestionsSection() {
  return (
    <section id="questions" className="faq-section section-space">
      <div className="page-width faq-layout">
        <div>
          <p className="eyebrow">Antes de arrancar</p>
          <h2>
            Preguntas
            <br />
            frecuentes.
          </h2>
        </div>
        <div className="faq-list">
          {questions.map(({ title, answer }) => (
            <details key={title}>
              <summary>
                {title}
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
