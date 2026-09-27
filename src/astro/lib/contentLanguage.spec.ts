import { describe, expect, test } from "bun:test"
import { contentLanguage } from "./contentLanguage"

describe("native reading language", () => {
  test("annotates Indonesian prose without changing the English shell", () => {
    expect(contentLanguage("/blogs/menulis-untuk-membuat-sejarah")).toBe("id")
    expect(contentLanguage("/blogs/reading-book")).toBe("en")
    expect(contentLanguage("/projects/teacher-exam")).toBe("en")
    expect(contentLanguage("/blogs/new-essay")).toBe("en")
  })
  test("keeps translated titles and excerpts independent from article language", () => {
    const mixed = "/blogs/if-you-re-not-paying-for-the-product-then-you-re-the-product"
    expect(contentLanguage(mixed)).toBe("id")
    expect(contentLanguage(mixed, "title")).toBe("en")
    expect(contentLanguage(mixed, "description")).toBe("en")
    expect(contentLanguage("/blogs/state-management-in-reactjs")).toBe("en")
    expect(contentLanguage("/blogs/state-management-in-reactjs", "description")).toBe("id")
    expect(contentLanguage("/blogs/unit-testing-react-component", "title")).toBe("en")
    expect(contentLanguage("/blogs/unit-testing-react-component")).toBe("id")
  })
})
