import Theme from "@/types/Theme.type";

function normalizeThemeType(theme: Theme): string {
   switch (theme) {
      case "success":
         return "primary";
      case "error":
         return "error";
      default:
         return "invalid-theme";
   }
}

export default normalizeThemeType;
