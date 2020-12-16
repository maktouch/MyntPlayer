import Logo from "./logo.png";

export function TopBar(props) {
  return (
    <div className="topbar w-auto">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <img src={Logo} />
          <span className="text-xs ml-2 ">
            v2 by MyntLabs.com &copy; {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </div>
  );
}
