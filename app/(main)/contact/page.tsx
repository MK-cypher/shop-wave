import FormComponent from "./_components/Form";

export default function page() {
  return (
    <main className="flex flex-1 justify-center items-center h-full mt-28">
      <div className="">
        <h2 className="text-center text-3xl mb-10 font-bold">Contact us</h2>
        <FormComponent />
      </div>
    </main>
  );
}
