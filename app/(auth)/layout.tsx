
export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="h-full  p-5 xl:px-5 xl:py-10 xl:my-14 flex items-center justify-center ">{children}</div>
    );
  }