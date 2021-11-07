import "./Button.css";

interface ButtonInput {
  text: string;
}

export function Button({ text }: ButtonInput) {
  return <button className="Button">{text}</button>;
  //   return <div className="Button">{text}</div>;
}
