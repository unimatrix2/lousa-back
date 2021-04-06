export default function countMapper(count) {
	switch (count) {
	case count < 10:
		return 1;
	default:
		return Math.ceil(count / 10);
	}
}
