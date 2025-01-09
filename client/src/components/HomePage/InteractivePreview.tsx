const InteractivePreview = () => {
  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src="/interactive-preview.html"
          title="Interaktywny album weselny"
          className="w-full h-full border-none"
        ></iframe>
      </div>
      <p className="mt-6 text-lg text-gray-600 text-center">
        Spróbuj przeciągnąć zdjęcie, dodać tekst lub tag i zobacz, jak łatwo
        tworzyć niezapomniane wspomnienia!
      </p>
    </div>
  );
};

export default InteractivePreview;
