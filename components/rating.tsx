import Image from "next/image";
export default function Rating({rating}: {rating: number}) {
  return (
    <div>
      {rating > 0 ? (
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            {[...Array(Math.trunc(rating))].map((item, i) => (
              <div key={i}>
                <Image width={20} height={20} src="/star.png" alt="star" className="w-5 h-5" />
              </div>
            ))}
            {rating % 1 != 0 && (
              <div>
                <Image width={20} height={20} src="/halfStar.png" alt="star" className="w-5 h-5" />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-muted-foreground">(no reviews yet)</div>
      )}
    </div>
  );
}
