
export function ProductImage() {
    return (
        <img className={"billedestyle"}
            src={"citron.jpg"}
            alt={"Citron"}
        />
    );
}

export function GalleryList() {
    return (
        <section>
            <h2>Frugter</h2>
            <ProductImage />
            <ProductImage />
            <ProductImage />
        </section>
    );
}

