import { GLOSSARY_DATA } from '@/constants/glossary';

export function Glossary() {
  return (
    <div className="glossary-section container">
      <h2 className="glossary-section__title">Glossary</h2>
      {GLOSSARY_DATA.map((item) => (
        <div key={item.term} className="glossary-item">
          <div className="glossary-item__term">{item.term}</div>
          <div className="glossary-item__def">{item.definition}</div>
        </div>
      ))}
    </div>
  );
}
