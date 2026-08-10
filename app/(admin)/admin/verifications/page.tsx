// app/(admin)/admin/verifications/page.tsx
import { prisma } from '@/lib/prisma'
import { Card } from '@/components/ui/Card'
import { VerificationActions } from './VerificationActions'

export const dynamic = 'force-dynamic'

export default async function VerificationsPage() {
  const pendingUsers = await prisma.customerProfile.findMany({
    where: {
      verificationStatus: {
        in: ['PENDING_REVIEW', 'IN_REVIEW']
      }
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          createdAt: true,
        }
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  // Fetch related data for each user
  const usersWithDetails = await Promise.all(
    pendingUsers.map(async (profile) => {
      const identification = await prisma.identificationRecord.findUnique({
        where: { userId: profile.userId }
      })
      const address = await prisma.address.findUnique({
        where: { userId: profile.userId }
      })
      return {
        ...profile,
        identification,
        address
      }
    })
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">KYC Verification</h1>
        <p className="text-gray-600 mt-1">
          {usersWithDetails.length} pending verification{usersWithDetails.length !== 1 ? 's' : ''}
        </p>
      </div>

      {usersWithDetails.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">All caught up!</h3>
            <p className="text-gray-500 mt-1">No pending verifications</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {usersWithDetails.map((profile) => (
            <Card key={profile.userId}>
              <div className="space-y-4">
                {/* User Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {profile.profilePhoto ? (
                      <img src={profile.profilePhoto} alt="" className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-800 font-medium">
                          {profile.firstName[0]}{profile.lastName[0]}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {profile.firstName} {profile.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">{profile.user.email}</p>
                      <p className="text-xs text-gray-400">Submitted: {new Date(profile.user.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className="badge-warning">{profile.verificationStatus.replace('_', ' ')}</span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="font-medium">{profile.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date of Birth</p>
                    <p className="font-medium">{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Nationality</p>
                    <p className="font-medium">{profile.nationality}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Gender</p>
                    <p className="font-medium">{profile.gender}</p>
                  </div>
                  {profile.identification && (
                    <>
                      <div>
                        <p className="text-gray-500">ID Type</p>
                        <p className="font-medium">{profile.identification.idType.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">ID Number</p>
                        <p className="font-medium">{profile.identification.idNumber}</p>
                      </div>
                    </>
                  )}
                  {profile.address && (
                    <div className="md:col-span-2">
                      <p className="text-gray-500">Address</p>
                      <p className="font-medium">
                        {profile.address.residentialAddress}
                        {profile.address.apartmentSuite && `, ${profile.address.apartmentSuite}`}
                      </p>
                      <p className="text-gray-600 text-xs">
                        {profile.address.city}, {profile.address.state} {profile.address.postalCode}
                      </p>
                    </div>
                  )}
                </div>

                {/* Document Links */}
                {profile.identification?.governmentIdFile && (
                  <div>
                    <a 
                      href={profile.identification.governmentIdFile} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View ID Document →
                    </a>
                  </div>
                )}

                {/* Actions */}
                <VerificationActions userId={profile.userId} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}