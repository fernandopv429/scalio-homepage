import { useState } from "react";

/**
 * Marca da Scalio.
 *
 * Tenta usar `/logo-scalio.png` (arquivo estático em `client/public/`) e, se
 * ele não existir ou falhar, cai para um monograma em SVG. Assim o header
 * nunca exibe imagem quebrada — era o que acontecia com o caminho antigo
 * `/manus-storage/...`, servido apenas pelo proxy de desenvolvimento.
 */
export default function Logo({ compact = false }: { compact?: boolean }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <a className={`brand ${compact ? "brand-compact" : ""}`} href="#top" aria-label="Scalio — início">
      {imageFailed ? (
        <svg className="brand-mark" viewBox="0 0 32 32" role="presentation" focusable="false" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="var(--orange)" />
          <path
            d="M20.6 11.3c-.9-1-2.2-1.5-3.9-1.5-1.5 0-2.7.3-3.5 1-.9.6-1.3 1.5-1.3 2.6 0 .9.3 1.6.9 2.1.6.5 1.6.9 3 1.2l1.7.4c.8.2 1.2.5 1.2 1.1 0 .4-.2.7-.5.9-.4.2-.9.3-1.6.3-1.5 0-2.6-.5-3.4-1.6l-2.3 1.8c1 1.5 2.8 2.3 5.4 2.3 1.7 0 3-.3 3.9-1 .9-.7 1.4-1.6 1.4-2.8 0-1-.3-1.7-.9-2.3-.6-.5-1.6-.9-3.1-1.2l-1.6-.3c-.8-.2-1.2-.5-1.2-1 0-.4.2-.7.5-.9.3-.2.8-.3 1.4-.3 1.3 0 2.3.4 3 1.3l2.4-1.8z"
            fill="#fff"
          />
        </svg>
      ) : (
        <img src="/logo-scalio.png" alt="" onError={() => setImageFailed(true)} />
      )}
      <span>scalio</span>
    </a>
  );
}
