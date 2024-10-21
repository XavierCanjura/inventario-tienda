import { useEffect } from "react";
import { useProductStore, useVentaStore } from "../../hooks"
import { PrivateLayout } from "../../layouts/PrivateLayout"

export const Statistics = () => {

    const { productsList, getProductsList } = useProductStore();
    const { salesList, getSales } = useVentaStore();

    useEffect(() => {
      getSales();
      getProductsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const getTotalStock = (): number => {
        let totalStock: number = 0;
        productsList.forEach( product => totalStock += product.amount )
        return totalStock;
    }

    const getLosses = (): number => {
        let totalLosses: number = 0;

        productsList.forEach( product => {
            totalLosses += product.totalHistory! * Number(product.priceBuy);
        })

        return totalLosses;
    }

    const getTotalSales = (): number => {
        let totalEarnings: number = 0;

        salesList.forEach( sale => {
            totalEarnings += sale.amountCart * Number(sale.price);
        });

        return totalEarnings;
    }

    const getEarnings = () => {
        return  getTotalSales() - getLosses();
    }

    return (
        <>
            <PrivateLayout title="Estadísticas">

                <div className="grid grid-cols-12 gap-2 mt-5">

                    <CardDetail 
                        title="Productos en Stock"
                        data={ getTotalStock().toString() }
                    />
                    <CardDetail 
                        title="Total de Gastos"
                        data={ `$${ getLosses().toFixed(2) }` }
                        dataClass="text-red-500"
                    />
                    <CardDetail 
                        title="Total de Ventas"
                        data={ `$${ getTotalSales().toFixed(2) }` }
                        dataClass="text-green-500"
                    />
                    <CardDetail 
                        title="Ganancias"
                        description="Ventas - Gastos"
                        data={`$${ getEarnings().toFixed(2) }`}
                        dataClass={` ${ getEarnings() < 0 ? 'text-red-500' : 'text-green-500' } `}
                    />

                </div>
            </PrivateLayout>
        </>
    )
}

const CardDetail = ({
    title,
    data,
    description,
    dataClass
}: {
    title: string;
    description?: string;
    data: string;
    dataClass?: string;
}) => {
    return(
        <div className="col-span-12 sm:col-span-6 xl:col-span-4 rounded-md border bg-white py-2 px-4">
            <h2 className="text-xl md:text-2xl font-semibold">{ title }</h2>
            <p>{ description }</p>
            <p className={`text-lg font-semibold ${ dataClass }`}>{ data }</p>
        </div>
    )
}