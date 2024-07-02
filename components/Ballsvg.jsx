import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"
const Football = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={800}
    height={800}
    viewBox="0 0 512 512"
    {...props}
  >
    <Path d="M511.921 250.052c-.733-30.931-6.977-61.718-18.618-90.468-12.804-31.622-32.147-60.503-56.263-84.612-12.861-12.861-27.063-24.381-42.336-34.261a253.335 253.335 0 0 0-48.143-24.308A254.4 254.4 0 0 0 294.22 2.822 259.878 259.878 0 0 0 232.127 1.1c-18.285 1.693-36.381 5.317-53.886 10.872a253.052 253.052 0 0 0-49.546 21.802c-15.841 9.107-30.684 19.93-44.233 32.189-3.233 2.925-6.356 5.957-9.469 9.009-22.517 22.517-40.834 49.152-53.613 78.329a253.643 253.643 0 0 0-17.614 58.627c-5.549 32.177-4.956 65.44 1.778 97.391a253.74 253.74 0 0 0 32.899 81.763c10.376 16.644 22.682 32.068 36.55 45.935C123.346 485.371 187.635 512 256.016 512s132.669-26.629 181.022-74.982c33.886-33.886 57.95-76.989 68.582-123.743 4.716-20.735 6.804-42.013 6.301-63.223zM354.725 37.325c26.054 11.775 50.036 28.282 70.857 49.104a245.465 245.465 0 0 1 5.801 6.027 24.771 24.771 0 0 0-15.747 17.827l-19.38 84.522a25.024 25.024 0 0 0-.576 7.224l-54.272 23.963a24.922 24.922 0 0 0-3.592-3.202l-67.207-48.828a24.805 24.805 0 0 0-6.495-3.378v-64.727a24.81 24.81 0 0 0 4.913-2.317l73.866-45.455c7.369-4.531 11.711-12.289 11.832-20.76zm-23.292 208.224-25.671 79.006a8.603 8.603 0 0 1-3.074 4.269c-.029.021-.056.045-.085.067a8.614 8.614 0 0 1-5.05 1.628h-83.072a8.619 8.619 0 0 1-5.045-1.624l-.097-.075a8.607 8.607 0 0 1-3.068-4.265L180.6 245.55a8.61 8.61 0 0 1 3.136-9.652l67.207-48.827a8.574 8.574 0 0 1 5.074-1.648c1.835 0 3.589.57 5.074 1.648l67.207 48.828a8.611 8.611 0 0 1 3.135 9.65zM173.555 35.888c.143-1.262.973-5.503 5.679-7.096 49.443-16.742 104.122-16.741 153.563 0 4.705 1.593 5.536 5.833 5.679 7.095.146 1.293.285 5.72-4.07 8.4L260.54 89.742c-2.723 1.676-6.327 1.676-9.049 0l-73.866-45.454c-4.355-2.68-4.216-7.107-4.07-8.4zM86.449 86.429c20.821-20.821 44.803-37.329 70.856-49.104.121 8.471 4.464 16.229 11.828 20.761L243 103.54a24.826 24.826 0 0 0 4.915 2.317v64.727a24.817 24.817 0 0 0-6.497 3.378l-67.207 48.828a24.968 24.968 0 0 0-3.591 3.202l-54.272-23.962a24.99 24.99 0 0 0-.576-7.225l-19.38-84.522a24.772 24.772 0 0 0-15.747-17.827 251.31 251.31 0 0 1 5.804-6.027zM16.226 253.713c.138-13.076 1.284-26.14 3.509-39.028l.023-.127c5.759-33.244 18.67-65.057 37.63-92.959a244.081 244.081 0 0 1 8.062-11.171c2.077-2.714 4.722-3.284 6.575-3.284 3.498 0 7.509 2.09 8.579 6.76l19.378 84.522a8.59 8.59 0 0 1-2.9 8.571l-66.986 55.614c-1.586 1.317-3.39 1.983-5.363 1.983-5.555.001-7.894-3.995-8.401-8.612a19.19 19.19 0 0 1-.106-2.269zM45.71 371.415c-15.515-28.176-25.185-59.256-28.348-91.733a24.837 24.837 0 0 0 7.372 1.114c5.771 0 11.205-1.978 15.711-5.719l66.986-55.614c.94-.781 1.808-1.62 2.609-2.508l54.013 23.848a24.866 24.866 0 0 0 1.138 9.753l25.671 79.006a24.941 24.941 0 0 0 2.827 5.891l-32.491 36.339a24.958 24.958 0 0 0-7.257-1.811l-86.267-8.093a25.672 25.672 0 0 0-2.411-.113c-7.731-.002-14.89 3.613-19.553 9.64zm144.739 108.823c-2.19 3.214-6.081 4.636-9.826 3.396-49.407-16.351-92.9-49.102-122.469-92.222-2.609-3.804-1.218-7.391-.499-8.756 1.544-2.93 4.388-4.68 7.608-4.68.294 0 .596.014.898.043l86.266 8.093a8.59 8.59 0 0 1 7.23 5.441l31.666 80.689c1.455 3.707.078 6.6-.874 7.996zm65.568 15.561c-17.938 0-35.574-1.958-52.666-5.77.161-.221.328-.438.484-.665 4.683-6.869 5.621-15.268 2.569-23.041l-31.666-80.689a25.315 25.315 0 0 0-1.448-3.061l33.226-37.159a24.903 24.903 0 0 0 7.965 1.309h83.072c2.768 0 5.449-.46 7.964-1.309l33.226 37.159a25.243 25.243 0 0 0-1.448 3.061l-31.666 80.689c-3.05 7.772-2.114 16.17 2.569 23.039.156.229.323.446.486.669-17.095 3.81-34.731 5.768-52.667 5.768zm197.861-104.388c-29.569 43.119-73.062 75.872-122.469 92.222a8.813 8.813 0 0 1-2.774.463c-2.768 0-5.405-1.443-7.053-3.861-.951-1.394-2.328-4.287-.874-7.994l31.666-80.689a8.588 8.588 0 0 1 7.23-5.441l86.267-8.093a9.76 9.76 0 0 1 .899-.043c3.219 0 6.062 1.75 7.607 4.681.718 1.366 2.109 4.951-.499 8.755zm12.443-19.995c-4.663-6.028-11.822-9.643-19.552-9.643a26 26 0 0 0-2.411.113l-86.268 8.093a24.976 24.976 0 0 0-7.256 1.811l-32.491-36.339a24.962 24.962 0 0 0 2.827-5.891l25.671-79.006a24.867 24.867 0 0 0 1.139-9.753l54.012-23.849c.801.888 1.67 1.728 2.609 2.508l66.986 55.614c4.506 3.741 9.939 5.719 15.711 5.719h.002c2.565 0 5.041-.391 7.37-1.114-3.163 32.481-12.832 63.562-28.349 91.737zm29.494-115.001c-.058 5.122-4.357 8.181-8.515 8.181-1.974 0-3.779-.667-5.364-1.983l-66.987-55.614a8.593 8.593 0 0 1-2.9-8.571l19.379-84.522c1.071-4.67 5.081-6.76 8.579-6.76 1.853 0 4.498.569 6.575 3.284 30.576 39.955 48.026 89.658 49.17 140.139.041 1.809.067 3.618.067 5.428.001.138-.004.277-.004.418z" />
  </Svg>
)
export default Football