// LAYOUTS
import { PrivateLayout } from "../../layouts/PrivateLayout"

// COMPONENTS
import { BrandItem, ButtonCustom, InputCustom } from "../../components"
import { useBrandStore } from "../../hooks"

export const Marcas = () => {

    const { brandsList, fetching } = useBrandStore();
    return (
        <>
            <PrivateLayout title="Marcas">
                <div className="flex justify-end my-3 gap-3">
                    <InputCustom 
                        placeholder="Buscar"
                        // onChange={ (event) => setInputSearch(event.target.value) }

                    />
                    <ButtonCustom 
                        text="Agregar Marca"
                        buttonClass="hidden md:block"
                        // onClick={ toggleShowModalAdd }
                    />
                </div>
                {
                    (brandsList.length === 0 && fetching) && (<h1 className="w-full text-center">Cargando...</h1>)
                }
                {
                    (brandsList.length === 0 && !fetching) && (<h1 className="w-full text-center">No hay registros en la base de datos</h1>)
                }
                <div className="responsive-grid gap-y-4 gap-2">
                    {
                        brandsList.map( () => (
                            <BrandItem />
                        ))
                    }
                </div>
            </PrivateLayout>
        </>
    )
}
