export default class ImageSelectorBox {
    constructor(field_name, image = null) {
        this.field_name = field_name;
        this.imageInput = document.getElementById(`${field_name}`);
        this.container = document.querySelector(`#${field_name}-box`);
        this.thumbnailImg = this.container.querySelector('.sg-img-selector__thumbnail');
        this.image = image;
        //this.templateUri = template.uri;
        this.initialize();
    }

    initialize() {
        this.updateView();
        const emptyBox = this.container.querySelector(`.sg-img-selector__empty-box`);
        emptyBox.addEventListener('click', () => { this.handleAddImageClick() });
        this.container.querySelector('.sg-img-selector__delete').addEventListener('click', () => { this.handleDeleteClick() });
        this.container.querySelector('.sg-img-selector__change').addEventListener('click', () => { this.handleAddImageClick() });
        this.container.closest('form').querySelector('input[type=submit]').onclick = () => {
                setTimeout(this.resetView.bind(this), 300);
        }
        this.container.classList.remove('loading');
    }

    handleDeleteClick() {
        this.image = null;
        this.updateView();
    }

    handleAddImageClick() {
        const imageSelector = wp.media({
            title: 'Choose Image',
            button: {
                text: 'Use This Image'
            },
            multiple: false
        });

        imageSelector.on('select', () => {
            const [selection] = imageSelector.state().get('selection').toJSON();

            this.image = {
                id: selection.id,
                thumbnail: selection.sizes.medium_medium?.url || selection.url,
                filename: selection.filename
            }
            this.updateView();
        })
        imageSelector.open();
    }
    resetView() {
        this.container.classList.add('empty');
        this.thumbnailImg.src = '';
        this.imageInput.value = '';
    }
    updateView() {

        if (!this.image) {
            this.resetView()
        } else {
            this.container.classList.remove('empty');
            this.thumbnailImg.src = this.image.thumbnail;
            this.thumbnailImg.alt = this.image.filename;
            this.imageInput.value = this.image.id;
        }
        this.imageInput.dispatchEvent(new Event('change'));
    }

}