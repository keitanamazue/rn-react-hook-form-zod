import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Form() {
  const schema = z.object({
    firstName: z.string().min(1),
    email: z.string().email("Invalid email address"),
    personName: z
      .string()
      .min(1, "名前は1文字以上である必要があります。")
      .max(100, "名前は100文字以下である必要があります。")
      .regex(
        /^[a-zA-Z-' ]+$/,
        "名前は文字、アポストロフィ、ハイフン、スペースのみを含むことができます。"
      ),
  });

  type schemaTypes = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaTypes>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data) => console.log(data);

  console.log({ errors });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="First name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="sample@gmail.com"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="personName"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="personName"
      />

      <Text>{errors.firstName?.message}</Text>
      <Text>{errors.email?.message}</Text>
      <Text>{errors.personName?.message}</Text>

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
