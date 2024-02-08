import NavbarHome from "@/components/Shared/NavbarHome";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavbarHome />
      {children}
    </div>
  );
};

export default HomeLayout;
