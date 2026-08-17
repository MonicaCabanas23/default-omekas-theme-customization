(function($) {

    $(document).ready(function() {

        const $btnCarousel = $('.btn-carousel');
        const $cards = $('.image-card-carousel');

        const transitionDuration = 1000;

        let isAnimating = false;


        /*
         * -----------------------------------------
         * INICIALIZAR CAROUSEL
         * -----------------------------------------
         *
         * La primera imagen y el primer botón
         * comienzan activos.
         */

        const $firstBtn = $btnCarousel.first();
        const $firstCard = $cards.first();

        $firstBtn.addClass('active');
        $firstCard.addClass('active');


        /*
         * -----------------------------------------
         * CLICK EN BOTONES
         * -----------------------------------------
         */

        $btnCarousel.on('click', function() {

            // No permitir otra transición mientras
            // la actual termina.
            if (isAnimating) {
                return;
            }


            // Si ya estamos en esa imagen, no hacer nada.
            if ($(this).hasClass('active')) {
                return;
            }


            /*
             * -----------------------------------------
             * OBTENER ÍNDICES
             * -----------------------------------------
             */

            const $currentBtn = $btnCarousel.filter('.active');

            const currentItemNumber =
                Number(
                    $currentBtn
                        .attr('class')
                        ?.match(/btn-carousel-(\d+)/)?.[1] || 0
                );


            const targetItemNumber =
                Number(
                    $(this)
                        .attr('class')
                        ?.match(/btn-carousel-(\d+)/)?.[1] || 0
                );


            if (!targetItemNumber) {
                return;
            }


            /*
             * -----------------------------------------
             * TARJETAS
             * -----------------------------------------
             */

            const $currentCard =
                $cards.filter('.active');

            const $targetCard =
                $(`.carousel-${targetItemNumber}`);


            if (!$currentCard.length || !$targetCard.length) {
                return;
            }


            /*
             * -----------------------------------------
             * DIRECCIÓN
             * -----------------------------------------
             */

            const goingNext =
                targetItemNumber > currentItemNumber;


            isAnimating = true;


            /*
             * -----------------------------------------
             * LIMPIAR ESTADOS ANTERIORES
             * -----------------------------------------
             */

            $cards.removeClass(
                'enter-right enter-left leaving-left leaving-right'
            );


            /*
             * -----------------------------------------
             * 1. COLOCAR B FUERA DE LA PANTALLA
             * -----------------------------------------
             */

            if (goingNext) {

                $targetCard.addClass('enter-right');

            } else {

                $targetCard.addClass('enter-left');

            }


            /*
             * -----------------------------------------
             * FORZAR REFLOW
             * -----------------------------------------
             */

            void $targetCard[0].offsetWidth;


            /*
             * -----------------------------------------
             * 2. HACER SALIR A
             * -----------------------------------------
             */

            if (goingNext) {

                $currentCard.addClass('leaving-left');

            } else {

                $currentCard.addClass('leaving-right');

            }


            /*
             * -----------------------------------------
             * 3. HACER ENTRAR B
             * -----------------------------------------
             */

            $targetCard.addClass('active');


            /*
             * -----------------------------------------
             * 4. ACTUALIZAR BOTÓN
             * -----------------------------------------
             */

            $(this)
                .addClass('active')
                .siblings()
                .removeClass('active');


            /*
             * -----------------------------------------
             * 5. LIMPIEZA
             * -----------------------------------------
             */

            setTimeout(function() {

                $currentCard.removeClass(
                    'active leaving-left leaving-right'
                );


                $targetCard.removeClass(
                    'enter-right enter-left'
                );


                $targetCard.addClass('active');


                isAnimating = false;

            }, transitionDuration);

        });

    });

})(jQuery);