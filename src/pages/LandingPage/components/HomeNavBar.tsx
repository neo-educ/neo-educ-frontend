const HomeNavBar = () => {
  return (
    <nav className="z-[99] fixed top-0 bg-white w-full flex justify-between px-10 py-4">
      <h1 className="font-bold text-3xl">NeoEduc</h1>
      <a href="/auth/login" className="rounded-lg bg-ne_primary btn text-white">
        Entrar
      </a>
    </nav>
  );
};

export default HomeNavBar;
