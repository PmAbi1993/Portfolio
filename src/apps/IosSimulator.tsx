import React from 'react';

// A lightweight mock of the iOS Simulator UI. We avoid heavy assets and
// simply approximate the device frame, dynamic island, and a title.
export function IosSimulator(): JSX.Element {
  return (
    <div className="w-full h-full p-4 flex items-center justify-center">
      <div className="relative bg-black rounded-[56px] p-3 shadow-inner" style={{ width: 360, height: 760 }} aria-label="iOS simulator mock">
        {/* Screen */}
        <div className="relative w-full h-full bg-white rounded-[44px] overflow-hidden">
          {/* Dynamic Island / Notch */}
          <div className="absolute left-1/2 -translate-x-1/2 top-3 bg-black rounded-[20px]" style={{ width: 140, height: 36 }} aria-hidden />

          {/* Status bar (very minimal) */}
          <div className="flex items-center justify-between px-4 pt-4 text-[11px] text-black/80 select-none">
            <span>12:30</span>
            <div className="flex items-center gap-1" aria-hidden>
              <span className="w-3 h-1 rounded-sm bg-black/60" />
              <span className="w-3 h-1 rounded-sm bg-black/60" />
              <span className="w-4 h-2 rounded-sm bg-black/80" />
            </div>
          </div>

          {/* App header */}
          <div className="mt-8 mb-2 text-center select-none">
            <h1 className="text-lg font-semibold text-black">Posts</h1>
          </div>

          {/* Content area */}
          <div className="absolute inset-x-0 bottom-0 top-24 bg-white" />

          {/* Home indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-28 h-1.5 rounded-full bg-black/20" aria-hidden />
        </div>
      </div>
    </div>
  );
}


