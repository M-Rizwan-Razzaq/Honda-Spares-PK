import { NextResponse, type NextRequest } from "next/server";
import { motorcycleModels } from "@/data/models";
import { categories } from "@/data/categories";

const modelIds = new Set(motorcycleModels.map((model) => model.id));
const categoryIds = new Set(categories.map((category) => category.id));

const detailPath = /^\/(models|categories)\/([^/]+)\/?$/;

export function proxy(request: NextRequest) {
  const match = request.nextUrl.pathname.match(detailPath);
  if (!match) return NextResponse.next();

  const [, segment, id] = match;
  const isValid = segment === "models" ? modelIds.has(id) : categoryIds.has(id);
  if (isValid) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/unknown-route";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/models/:path*", "/categories/:path*"],
};
