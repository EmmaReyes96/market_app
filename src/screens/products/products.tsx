import DynamicTable from "@components/table/Table";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  XCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import {
  GetProductParams,
  Product,
  ProductItem,
} from "@interfaces/products.interfaces";
import { ProductService } from "@services/products.service";
import { useEffect, useState } from "react";
import ProductCreate from "./product-create";
import { useSnackbar } from "notistack";
import Spinner from "@components/spinner/Spinner";

const Products = () => {
  //#region ----- CONST -----
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product>();
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(
    null
  );
  const [deleteProduct, setDeleteProduct] = useState<string | null>(null);
  const [search, setSearch] = useState<string | undefined>("");
  const [order, setOrder] = useState<{
    orderby: string;
    order: "asc" | "desc";
  }>({ orderby: "name", order: "asc" });
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const { enqueueSnackbar } = useSnackbar();

  const LIMIT_OPTIONS = [5, 10, 20];

  const HEADER_TABLE_CONFIG = [
    {
      label: "Productos",
      sortByKey: "name",
    },
    {
      label: "Precio",
      sortByKey: "price",
    },
    {
      label: "",
    },
  ];
  //#endregion

  //#region ----- UPDATE PRODUCTS LIST -----
  useEffect(() => {
    setProductsTable();
  }, [page, order, limit]);

  const setProductsTable = async () => {
    try {
      setLoading(true);
      const params: Partial<GetProductParams> = {
        filterName: search,
        orderby: order?.orderby,
        order: order?.order,
        limit,
        page,
      };
      const response = await ProductService.getProducts(params);
      setProducts(response.result);
      setLimit(response.result.limit);
    } catch (error) {
      enqueueSnackbar(
        "Lo sentimos, no pudimos cargar los productos en este momento. Por favor, inténtalo de nuevo más tarde. ",
        { variant: "warning" }
      );
    } finally {
      setLoading(false);
    }
  };

  const editChange = (
    index: number,
    fieldName: string,
    newValue: string | number
  ) => {
    setProducts((prevProducts) => {
      if (!prevProducts || !prevProducts.payload) {
        return prevProducts;
      }
      const updatedPayload = [...prevProducts.payload];
      updatedPayload[index] = {
        ...updatedPayload[index],
        [fieldName]: newValue,
      };
      return { ...prevProducts, payload: updatedPayload };
    });
  };

  const confirmEditProduct = async (index: number) => {
    try {
      const product = products!.payload[index];
      await ProductService.editProduct({
        id: product._id,
        name: product.name,
        price: product.price,
      });
      setEditingProduct(null);
    } catch (e) {
      enqueueSnackbar(
        "Lo sentimos, no pudimos editar el producto en este momento. Por favor, inténtalo de nuevo más tarde. ",
        { variant: "warning" }
      );
      cancelEditingProduct(index);
    }
  };

  const cancelEditingProduct = (index: number) => {
    setProducts((prevProducts) => {
      if (!prevProducts || !prevProducts.payload) {
        return prevProducts;
      }
      const updatedPayload = [...prevProducts.payload];
      updatedPayload[index] = editingProduct!;
      return { ...prevProducts, payload: updatedPayload };
    });
    setEditingProduct(null);
  };

  const deleteProductConfirm = async () => {
    try {
      await ProductService.removeProduct(deleteProduct!);
      setProducts((prevProducts) => {
        if (!prevProducts || !prevProducts.payload) {
          return prevProducts;
        }
        const updatedPayload = prevProducts.payload.filter(
          (product) => product._id !== deleteProduct
        );
        return { ...prevProducts, payload: updatedPayload };
      });
      setDeleteProduct(null);
    } catch (e) {
      enqueueSnackbar(
        "Lo sentimos, no pudimos eliminar el producto en este momento. Por favor, inténtalo de nuevo más tarde. ",
        { variant: "warning" }
      );
    }
  };
  //#endregion

  return (
    <>
      <div className="bg-white p-8 rounded-md w-full">
        <div className="flex items-center justify-between pb-6 flex-wrap">
          <h2 className="text-gray-600 font-semibold">Lista de productos</h2>

          <div className="flex bg-gray-50 items-center p-2 max-sm:px-0 rounded-md">
            <input
              className="bg-gray-50 outline-none ml-1 block "
              type="text"
              placeholder="buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? setProductsTable() : null)}
            />
            <button
              className="bg-primary rounded-full ml-1 p-2 "
              onClick={() => setProductsTable()}
            >
              <MagnifyingGlassIcon className="h-4 text-white" />
            </button>
          </div>
        </div>
        <ProductCreate updateTable={setProductsTable} />
        {loading ? (
          <div className="flex items-center justify-center mt-20">
            <Spinner size="auto" />
          </div>
        ) : (
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <DynamicTable
                headers={HEADER_TABLE_CONFIG}
                sortConfig={order}
                onSort={(e) => setOrder(e)}
              >
                {products?.payload.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {editingProduct?._id === item._id ? (
                        <input
                          type="text"
                          className="text-gray-900 whitespace-no-wrap outline-none p-2 border border-black border-solid rounded-lg"
                          value={item.name}
                          onChange={(e) =>
                            editChange(index, "name", e.target.value)
                          }
                        />
                      ) : (
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.name}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {editingProduct?._id === item._id ? (
                        <input
                          type="number"
                          className="text-gray-900 whitespace-no-wrap outline-none p-2 border border-black border-solid rounded-lg"
                          value={item.price}
                          onChange={(e) =>
                            editChange(
                              index,
                              "price",
                              parseFloat(e.target.value)
                            )
                          }
                        />
                      ) : (
                        <p className="text-gray-900 whitespace-no-wrap">
                          $ {item.price}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white">
                      <div className="flex justify-end gap-2">
                        {editingProduct?._id === item._id ? (
                          <>
                            <button onClick={() => confirmEditProduct(index)}>
                              <CheckCircleIcon className="h-6 text-green-600" />
                            </button>
                            <button onClick={() => cancelEditingProduct(index)}>
                              <XCircleIcon className="h-6 text-red-600" />
                            </button>
                          </>
                        ) : deleteProduct === item._id ? (
                          <>
                            <button onClick={() => deleteProductConfirm()}>
                              <CheckCircleIcon className="h-6 text-green-600" />
                            </button>
                            <button onClick={() => setDeleteProduct(null)}>
                              <XCircleIcon className="h-6 text-red-600" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => setEditingProduct(item)}>
                              <PencilSquareIcon className="h-6" />
                            </button>
                            <button onClick={() => setDeleteProduct(item._id)}>
                              <TrashIcon className="h-6" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </DynamicTable>

              <div className="flex justify-between w-full items-end  p-4">
                <div className="text-start">
                  <p className="text-xs xs:text-sm text-gray-900 mb-2">
                    Productos por pagina:
                  </p>
                  <select
                    value={limit}
                    onChange={(e) => setLimit(parseInt(e.target.value))}
                    className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none w-max p-3"
                  >
                    {LIMIT_OPTIONS.map((number) => (
                      <option key={number} value={number}>
                        {number}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-end">
                  <p className="text-xs xs:text-sm text-gray-900 mb-2">
                    Pagina {page} de {products?.pages} - Total:{" "}
                    {products?.total}
                  </p>
                  <div className="flex gap-2">
                    <button
                      disabled={page === 1}
                      className="text-sm text-indigo-50 transition duration-150 bg-primary disabled:bg-gray-500 font-semibold py-2 px-4 rounded-l"
                      onClick={() => setPage(page - 1)}
                    >
                      Anterior
                    </button>
                    <button
                      disabled={page === products?.pages}
                      className="text-sm text-indigo-50 transition duration-150 bg-primary disabled:bg-gray-500 font-semibold py-2 px-4 rounded-r"
                      onClick={() => setPage(page + 1)}
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
