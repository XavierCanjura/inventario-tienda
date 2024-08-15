import { ProductItem } from "../../components"
import { PrivateLayout } from "../../layouts/PrivateLayout"

export const Products = () => {
    return (
        <>
            <PrivateLayout title="Productos">
                <div className="">
                    <div className="my-3">
                        <input type="text" className="h-[35px] border rounded-[20px] px-3 outline-none" />
                    </div>
                    <div className="responsive-grid gap-y-4 gap-2">
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />


                    </div>
                </div>
            </PrivateLayout>
        </>
    )
}
