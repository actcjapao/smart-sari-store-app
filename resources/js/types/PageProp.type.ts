import FlashMessages from "./FlashMessages.type";
import type { PageProps as InertiaPageProps } from "@inertiajs/core";

export interface PageProps extends InertiaPageProps {
   flash: FlashMessages;
}
