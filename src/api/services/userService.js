export default function handleUserServiceRequest() {
	const id = env.USER_DO.idFromName();

	const stub = env.USER_DO.get(id);
}
