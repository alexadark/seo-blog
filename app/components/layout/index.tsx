import { Header } from "./Header";
import { Footer } from "./Footer";

type Props = {
  children: JSX.Element;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <Header />
        <div className="max-w-site mx-auto relative">
          <main className="pt-[120px] pb-10 mx-auto max-w-full px-5">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};
