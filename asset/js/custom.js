(function($) {
    $(document).ready(function() {
        const btnCarousel = $('.btn-carousel');

        btnCarousel.on('click', function() {
            const classes = $(this).attr('class').split(' '); // Get all classes of the clicked button
            const itemNumber = Number(classes.find(cls => cls.startsWith('btn-carousel-'))?.replace('btn-carousel-', '') || 0); // Extract the item number from the class

            if (itemNumber > 0) {
                const carouselItem = $(`.carousel-${itemNumber}`);
                carouselItem.addClass('active').siblings().removeClass('active');
            }

            $(this).addClass('active').siblings().removeClass('active');
        })
    })
})(jQuery);