import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    isDarkMode: false,
  }),
  actions: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      this.applyTheme();
      this.saveThemePreference();
    },
    setTheme(isDark: boolean) {
      this.isDarkMode = isDark;
      this.applyTheme();
      this.saveThemePreference();
    },
    applyTheme() {
      if (this.isDarkMode) {
        document.documentElement.classList.add("dark-theme");
      } else {
        document.documentElement.classList.remove("dark-theme");
      }
    },
    saveThemePreference() {
      localStorage.setItem("theme", this.isDarkMode ? "dark" : "light");
    },
    initTheme() {
      // Check if user has already set a preference
      const userPreference = localStorage.getItem("theme");
      if (userPreference === "dark") {
        this.setTheme(true);
      } else {
        // Default to light theme
        this.setTheme(false);
      }
    },
  },
  persist: true,
});
