export default function IconButton({ children, handleAction, ...props }) {
  const handleClick = (e) => {
    handleAction(e);
  };

  const handleKeydown = (e) => {
    if (e.key === 'Enter') {
      handleAction(e);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeydown}
      {...props}
    >
      {children}
    </div>
  );
}
