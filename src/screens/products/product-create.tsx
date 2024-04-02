import Spinner from "@components/spinner/Spinner";
import { ProductService } from "@services/products.service";
import { useSnackbar } from "notistack";
import { FormEvent, useState } from "react";

const ProductCreate = ({ updateTable }: { updateTable: () => void }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !price) {
      enqueueSnackbar("El nombre del producto y el precio son requeridos", {
        variant: "warning",
      });
      return;
    }
    try {
      setLoading(true);
      await ProductService.addProduct({
        name,
        price,
      });
      setName("");
      setPrice(undefined);
      updateTable();
    } catch (e: any) {
      enqueueSnackbar(
        "Lo sentimos, no pudimos cargar el producto en este momento. Por favor, inténtalo de nuevo más tarde. ",
        { variant: "warning" }
      );
    } finally {
      setLoading(false);
      setShowForm(false);
    }
  };

  const SubmitTmp: React.FC = () => {
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <div className="flex gap-2">
          <button className="btn-primary " type="submit">
            Guardar
          </button>
          <button className="btn-gray " onClick={() => setShowForm(false)}>
            Cancelar
          </button>
        </div>
      );
    }
  };

  return (
    <>
      {showForm ? (
        <div className="card">
          <p className="text-gray-700 pb-4">Nuevo Producto</p>
          <form
            onSubmit={handleSubmit}
            className="flex justify-between items-center gap-2 max-md:flex-wrap"
          >
            <input
              type="text"
              className="text-gray-900 whitespace-no-wrap outline-none p-2 border border-black border-solid rounded-lg w-full "
              placeholder="Producto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              className="text-gray-900 whitespace-no-wrap outline-none p-2 border border-black border-solid rounded-lg w-full"
              placeholder="Precio"
              value={price === undefined ? "" : price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
            <SubmitTmp />
          </form>
        </div>
      ) : (
        <div className="flex flex-row-reverse space-x-8">
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            Nuevo
          </button>
        </div>
      )}
    </>
  );
};

export default ProductCreate;
