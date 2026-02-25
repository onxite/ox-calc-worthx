import { FAQ_DATA } from '@/constants/faqs';

export function FAQ() {
  return (
    <div className="faq-section container">
      <h2 className="faq-section__title">Frequently Asked Questions</h2>
      {FAQ_DATA.map((faq, i) => (
        <details key={i} className="faq-item">
          <summary>{faq.q}</summary>
          <p className="faq-item__answer">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
