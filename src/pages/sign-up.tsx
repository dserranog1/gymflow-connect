import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "@/components/forms/SignUpForm";

const SignUpPage = () => {
  return (
    <div>
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Registro</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
