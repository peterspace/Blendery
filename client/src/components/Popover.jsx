import { useEffect, useRef } from "react";

function Popover({
  children,
  content,
  trigger = "click",
  isPopoverOpen,
  setIsPopoverOpen,
  handleOpenPopover,
}) {
  const wrapperRef = useRef(null);

  const handleMouseOver = () => {
    if (trigger === "hover") {
      setIsPopoverOpen(true);
    }
  };

  const handleMouseLeft = () => {
    if (trigger === "hover") {
      setIsPopoverOpen(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsPopoverOpen(false);
      }
    }

    if (isPopoverOpen) {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isPopoverOpen, wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeft}
      className="w-fit h-fit relative flex justify-center"
    >
      <div className="cursor-pointer" onClick={handleOpenPopover}>
        {children}
      </div>
      <div
        hidden={!isPopoverOpen}
        className={`min-w-fit w-[200px] h-fit absolute bottom-[50%] right-[0%] z-50 transition-all animate-popoverClose
            ${isPopoverOpen ? "animate-popoverOpen" : null}
        `}
      >
        <div className="rounded bg-white shadow-lg mb-[10px]">{content}</div>
      </div>
    </div>
  );
}

export default Popover;
