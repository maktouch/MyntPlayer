import { RecoilRoot } from "recoil";

export function Layout(props) {
  return (
    <RecoilRoot>
      <div className="app h-full bg-black mx-auto text-gray-300">
        {props.children}
      </div>
    </RecoilRoot>
  );
}
