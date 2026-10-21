"use client";

import { useEffect } from "react";

export function ContactScript() {
  useEffect(() => {
    // Enable smooth jump for anchor links on contact page
    const handleSmoothJump = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      if (hash && hash.startsWith("#")) {
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState(null, "", hash);
        }
      }
    };
    document.addEventListener("click", handleSmoothJump);

    if (window.location.hash) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }

    const truncate = (str: string, len = 26) =>
      str.length > len ? str.slice(0, len - 1) + "…" : str;

    const form = document.querySelector<HTMLFormElement>("[data-brief]");
    if (!form || form.dataset.ready) {
      return () => {
        document.removeEventListener("click", handleSmoothJump);
      };
    }
    form.dataset.ready = "1";

    const getOut = (key: string) =>
      document.querySelector<HTMLElement>(`[data-out="${key}"]`);
    const outStatus = document.querySelector<HTMLElement>("[data-out-status]");
    const outMeter = document.querySelector<HTMLElement>("[data-out-meter]");
    const outReq = document.querySelector<HTMLElement>("[data-out-req]");
    const getElem = (name: string) =>
      form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;

    const setOut = (key: string, val: string | null) => {
      const el = getOut(key);
      if (!el) return;
      const text = val ?? "null";
      if (el.textContent !== text) {
        el.textContent = text;
        el.classList.toggle("is-null", val === null);
        el.classList.remove("is-new");
        void el.offsetWidth; // trigger reflow
        el.classList.add("is-new");
      }
    };

    const fmtStr = (val: string) =>
      val.trim() ? JSON.stringify(truncate(val.trim())) : null;

    const setStatus = (msg: string, ready = false) => {
      if (outStatus) {
        outStatus.textContent = msg;
        outStatus.classList.toggle("is-ready", ready);
      }
    };

    const updateReadout = () => {
      const fd = new FormData(form);
      const needs = fd.getAll("needs[]").map(String);
      const message = String(fd.get("message") ?? "");
      const words = message.trim().split(/\s+/).filter(Boolean).length;

      setOut("name", fmtStr(String(fd.get("name") ?? "")));
      setOut("email", fmtStr(String(fd.get("email") ?? "")));
      setOut("company", fmtStr(String(fd.get("company") ?? "")));
      setOut("needs", needs.length ? `[${needs.map((n) => JSON.stringify(n)).join(", ")}]` : null);
      setOut("timeline", fd.get("timeline") ? JSON.stringify(fd.get("timeline")) : null);
      setOut("nda", fd.get("nda") ? "true" : "false");
      setOut("words", words ? String(words) : null);

      const nameEl = getElem("name");
      const emailEl = getElem("email");
      const termsEl = getElem("terms") as HTMLInputElement | null;

      const validCount = [
        nameEl?.validity.valid,
        emailEl?.validity.valid,
        words > 0,
        termsEl?.checked,
      ].filter(Boolean).length;

      if (outReq) outReq.textContent = `${validCount}/4`;
      if (outMeter) outMeter.style.transform = `scaleX(${validCount / 4})`;
      setStatus(validCount === 4 ? "ready to send" : "draft", validCount === 4);
    };

    form.addEventListener("input", updateReadout);
    form.addEventListener("change", updateReadout);
    updateReadout();

    const sendBtn = form.querySelector<HTMLButtonElement>("[data-brief-send]");
    const errorBox = form.querySelector<HTMLElement>("[data-brief-error]");
    const doneBox = document.querySelector<HTMLElement>("[data-brief-done]");

    form.noValidate = true;
    const requiredInputs = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[required]"));

    const showError = (input: HTMLInputElement | HTMLTextAreaElement, show: boolean) => {
      const err = form.querySelector<HTMLElement>(`[data-error-for="${input.id}"]`);
      if (err) {
        err.hidden = !show;
        if (show) {
          input.setAttribute("aria-invalid", "true");
          input.setAttribute("aria-describedby", err.id);
        } else {
          input.removeAttribute("aria-invalid");
          input.removeAttribute("aria-describedby");
        }
      }
    };

    const isInvalid = (input: HTMLInputElement | HTMLTextAreaElement) => {
      if (input.type === "checkbox") {
        return !(input as HTMLInputElement).checked;
      }
      return !input.checkValidity() || !input.value.trim();
    };

    requiredInputs.forEach((input) => {
      input.addEventListener(input.type === "checkbox" ? "change" : "input", () => {
        if (input.getAttribute("aria-invalid")) {
          showError(input, isInvalid(input));
        }
      });
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const invalidFields = requiredInputs.filter(isInvalid);
      requiredInputs.forEach((input) => showError(input, invalidFields.includes(input)));

      if (invalidFields.length) {
        invalidFields[0].focus();
        return;
      }

      if (errorBox) errorBox.hidden = true;
      if (sendBtn) sendBtn.disabled = true;
      setStatus("sending…", true);

      try {
        const bodyParams = new URLSearchParams(
          Array.from(new FormData(form).entries()).map(([k, v]) => [k, String(v)])
        );
        const res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: bodyParams.toString(),
        });
        if (!res.ok) throw new Error(String(res.status));

        const nameVal = getElem("name")?.value.trim().split(/\s+/)[0] ?? "";
        const emailVal = getElem("email")?.value.trim() ?? "";
        const doneName = document.querySelector<HTMLElement>("[data-done-name]");
        const doneEmail = document.querySelector<HTMLElement>("[data-done-email]");

        if (doneName && nameVal) doneName.textContent = `, ${nameVal}`;
        if (doneEmail) doneEmail.textContent = emailVal;

        setStatus("200 OK", true);
        form.hidden = true;
        if (doneBox) {
          doneBox.hidden = false;
          doneBox.focus();
        }
      } catch {
        setStatus("error · retry");
        if (errorBox) errorBox.hidden = false;
      } finally {
        if (sendBtn) sendBtn.disabled = false;
      }
    });

    return () => {
      document.removeEventListener("click", handleSmoothJump);
    };
  }, []);

  return null;
}
