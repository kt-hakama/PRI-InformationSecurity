'use client';

import { usePathname } from 'next/navigation';
import { getRelativePath } from '@/lib/relative-path';

type AppLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * 静的エクスポート環境用のリンクコンポーネント。
 * file:// では相対パス、Web では絶対パスの <a> タグを使用する。
 * これにより、index.html を直接開いても、静的ホスティングでも正しく動作する。
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

  // 静的エクスポート環境では Next.js Link ではなく通常の <a> タグを使用
  // これによりフルページ遷移となり、クライアント側の例外を回避できる
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}
