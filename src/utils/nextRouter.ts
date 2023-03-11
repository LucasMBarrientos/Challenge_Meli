import Router from "next/router";

export function redirectTo(path: string) {
  Router.push(path);
}

export function back() {
  Router.back();
}
