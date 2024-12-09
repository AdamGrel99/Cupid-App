function FotoPage() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <input
        type="file"
        id="picture"
        name="picture"
        accept="image/*"
        capture="environment"
      />
    </>
  );
}

export default FotoPage;
