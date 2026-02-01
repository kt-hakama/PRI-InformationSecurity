'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getRelativePath } from '@/lib/relative-path';

type AppLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * file:// で開いたときは相対パスの <a> にし、通常は Next.js の Link を使う。
 * これで index.html を直接開いてもシナリオリンクが動く。
 */
export default function AppLink({ href, children, className, ...rest }: AppLinkProps) {
  const pathname = usePathname();
  const isFileProtocol =
    typeof window !== 'undefined' && window.location?.protocol === 'file:';
  // file:// では usePathname() が正しくないことがあるため、ビルド時に注入した __CURRENT_PATH__ を使う
  const currentPath =
    typeof window !== 'undefined' && (window as unknown as { __CURRENT_PATH__?: string }).__CURRENT_PATH__;

  if (isFileProtocol && href.startsWith('/') && !href.startsWith('//')) {
    const relativeHref = getRelativePath(currentPath || pathname || '/', href, true);
    return (
      <a href={relativeHref} className={className} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}
