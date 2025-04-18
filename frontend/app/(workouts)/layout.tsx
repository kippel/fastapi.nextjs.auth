import ProtectedRoute from "@/components/protected";
type Props = {
  children: React.ReactNode;
};

const LessonLayout = ({ children }: Props) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default LessonLayout;
