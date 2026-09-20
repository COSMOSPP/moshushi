import { cn } from '@/lib/utils';
import medalSpriteUrl from '@/assets/level-medals.png';

interface LevelMedalIconProps {
  level: number;
  name?: string;
  className?: string;
}

export default function LevelMedalIcon({ level, name, className }: LevelMedalIconProps) {
  const normalizedLevel = Math.min(12, Math.max(1, level));
  const column = (normalizedLevel - 1) % 4;
  const row = Math.floor((normalizedLevel - 1) / 4);

  return (
    <div
      className={cn(
        'h-12 w-12 shrink-0 bg-no-repeat drop-shadow-[0_10px_12px_rgba(15,23,42,0.28)]',
        className,
      )}
      role="img"
      aria-label={`Lv.${normalizedLevel}${name ? ` ${name}` : ''}等级勋章`}
      style={{
        backgroundImage: `url("${medalSpriteUrl}")`,
        backgroundSize: '400% 400%',
        backgroundPosition: `${(column / 3) * 100}% ${(row / 3) * 100}%`,
      }}
    />
  );
}
