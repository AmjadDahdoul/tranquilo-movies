interface ContainerProps {
  children: React.ReactNode;
}

export const Container = (props: ContainerProps) => {
  const { children } = props;

  return <div className="container mx-auto px-4">{children}</div>;
};
