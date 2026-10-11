import { Plus } from "lucide-react";

export default function QuestionsSection({
  eyebrow,
  title,
  children: questions,
}: {
  eyebrow: string;
  title: string[];
  children: { title: string; answer: string }[];
}) {
  return (
    <section id="questions" className="faq-section section-space">
      <div className="page-width faq-layout">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>
            {title[0]}
            <br />
            {title[1]}
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
